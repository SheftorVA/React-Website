import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Filter() {
  const [data, setData] = useState(null);
  const [type, setType] = useState();
  const [img, setImg] = useState([]);

  const buttonNodeList = document.querySelectorAll('.btn-container button');
  const buttonArr = Array.from(buttonNodeList);

  function all() {
    setType('ALL');
  }

  function setTypeOnClick(e) {
    const getButtonText = e.target.firstChild.nodeValue.toLowerCase();
    setType(getButtonText);
  }

  function onClick(e) {
    localStorage.setItem(
      'clickedPokemon',
      e.target.firstChild.data.toLowerCase()
    );
  }

  function onClickImage(e) {
    const name =
      e.nativeEvent.path[1].parentNode.firstChild.innerText.toLowerCase();

    localStorage.setItem('clickedPokemon', name);
  }

  useEffect(() => {
    if (type && type !== 'ALL') {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => response.json())
        .then((json) => setData(json));
    }
    if (data && type && type !== 'ALL') {
      for (const pokemon of data.pokemon) {
        fetch(`${pokemon?.pokemon['url']}`)
          .then((response) => response.json())
          .then((json) => setImg((items) => [...items, json]));
      }
    }
  }, [type]);

  let pokemonType;

  if (data && img) {
    {
      buttonArr.map((el, i) => {
        el.innerText === type.toUpperCase()
          ? el.classList.add('active-btn')
          : el.classList.remove('active-btn');
      });
    }
    pokemonType = data.pokemon.map((el, i) => {
      return (
        <Link to="pokemon" key={i}>
          <li key={i} className="card">
            <div onClick={onClick} className="poke-name">
              {el.pokemon.name.toUpperCase()}
            </div>
            <img
              src={img[i]?.sprites.front_shiny}
              onClick={onClickImage}
              alt=""
            />
            {/* {<LikeButton />} */}
          </li>
        </Link>
      );
    });
  }

  return (
    <div className="container type">
      {/* {img.map((el, i) => {
        <li key={i}>
          <img src={el} alt="" />
        </li>;
      })} */}

      <div className="btn-container">
        <button id="all" onClick={all}>
          ALL
        </button>
        <button onClick={setTypeOnClick}>WATER</button>
        <button onClick={setTypeOnClick}>FIRE</button>
        <button onClick={setTypeOnClick}>GRASS</button>
        <button onClick={setTypeOnClick}>GROUND</button>
        <button onClick={setTypeOnClick}>NORMAL</button>
        <button onClick={setTypeOnClick}>FAIRY</button>
      </div>
      {type !== 'ALL' && (
        <div>
          {pokemonType && <ul className="home">{pokemonType}</ul>}
          {pokemonType && <h3>ALL POKEMON</h3>}
        </div>
      )}
    </div>
  );
}

export default Filter;
