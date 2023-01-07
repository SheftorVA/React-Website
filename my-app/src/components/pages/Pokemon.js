import { useEffect, useState } from 'react';
import { IoShieldOutline, IoAdd, IoFlashOutline } from 'react-icons/io5';
import { GiBroadsword, GiHealingShield, GiPointySword } from 'react-icons/gi';
import PokemonImage2D from '../PokemonImage2D';
import PokemonImage3D from '../PokemonImage3D';
import RingLoader from 'react-spinners/ClipLoader';
import LikeButton from '../LikeButton';
import './Pokemon.css';
import Blue from '../themes/Blue';
import Orange from '../themes/Orange';
import Pink from '../themes/Pink';
import Maroon from '../themes/Maroon';

function Pokemon() {
  if (window.localStorage.getItem('loggedIn') === 'true') {
    if (window.localStorage.getItem('theme') === 'orange') {
      Orange();
    } else if (window.localStorage.getItem('theme') === 'maroon') {
      Maroon();
    } else if (window.localStorage.getItem('theme') === 'blue') {
      Blue();
    } else if (window.localStorage.getItem('theme') === 'pink') {
      Pink();
    }
  }

  const icons = [
    <IoAdd />,
    <GiBroadsword />,
    <IoShieldOutline />,
    <GiPointySword />,
    <GiHealingShield />,
    <IoFlashOutline />,
  ];

  const clickedPokemon = localStorage.getItem('clickedPokemon');
  const loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'));

  const [threeD, setThreeD] = useState(null);
  const [data, setData] = useState({ name: '' });
  const [stat, setStat] = useState(null);

  const imgNodeList = document.querySelectorAll('.pokemon-image');
  const imgArr = Array.from(imgNodeList);

  const threeDToggle = () => {
    threeD ? setThreeD(false) : setThreeD(true);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${clickedPokemon}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [clickedPokemon]);

  useEffect(() => {
    fetch(`data.stats[0].stat.url`).then((json) => setStat(json));
  }, [clickedPokemon]);

  if (data.name !== '') {
    const pokemonList = data.stats.map((pokemon, i) => {
      return (
        <li key={i}>
          {pokemon.stat.name.toUpperCase()}: {data.stats[i].base_stat}
        </li>
      );
    });

    const pokemonListWithIcons = pokemonList.map((el, i) => {
      return (
        <div className="stat-icons--container" key={i}>
          {icons[i]} {el}
        </div>
      );
    });

    return (
      <>
        <div className="pokemon__container">
          {loggedIn && <LikeButton />}

          {/* <div className="tilting-card-wrapper">
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>
            <div class="mouse-position-tracker"></div>

            <div className="tilting-card-content"> */}
          <div className="img-container on" onClick={threeDToggle}>
            {threeD ? (
              <PokemonImage2D data={data} />
            ) : (
              <>
                <PokemonImage3D data={data} />
                <PokemonImage3D data={data} />
              </>
            )}
          </div>
          <h1>{data.name.toUpperCase()}</h1>
          <div className="stat">
            <ul>{pokemonListWithIcons}</ul>
          </div>
          <div className="types">
            <p>{[data.types[0]?.type.name]}</p>
            {data.types[1]?.type.name && <p>{[data.types[1]?.type.name]}</p>}
          </div>
        </div>
        {/* <h2 className="threeD" onClick={threeDToggle}>
              {threeD ? '3D OFF' : '3D ON'}
            </h2> */}
        {/* </div> */}
        {/* </div> */}
      </>
    );
  } else {
    return (
      <h1 className="loading">
        <RingLoader />
      </h1>
    );
  }
}

export default Pokemon;
