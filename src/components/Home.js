
import PizzaCard from './PizzaCard';
import './home.css'
import axios from "axios";
import { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState(null);
    const [cat, setCat] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/${cat}`)
            .then(function (response) {
                // handle success
                setData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [cat])

    function changeCat(cati)
    {
        setCat(cati);
    }

    return (
      <div className='container'>
          <div className='m-3'>
              <img alt='' className='img-fluid w-100' src={'/images/Banner.png'}></img>
          </div>

          <div className='container d-flex justify-content-between align-items-center gap-2 my-5'>
            <h3 className='menuhead my-auto'>Our Menu</h3>
            <div className='menupills d-flex justify-content-evenly w-75'>
                <button onClick={() => changeCat("Pizza")} className='btn btn-light btn-lg shadow-lg btn-rounded d-flex align-items-center gap-2 p-1 pe-2'>
                    <div className='btnpill'>
                        <img alt="" src={'/images/pizza.png'} width="35" height="35" className="mt-1"/>
                    </div> Pizza
                </button>
                <button onClick={() => changeCat("Burger")} className='btn btn-light btn-lg shadow-lg btn-rounded d-flex align-items-center gap-2 p-1 pe-2'>
                    <div className='btnpill'>
                        <img alt="" src={'/images/sandwich.png'} width="35" height="35" className="mt-1"/>
                    </div> Burger
                </button>
                <button onClick={() => changeCat("Fries")} className='btn btn-light btn-lg shadow-lg btn-rounded d-flex align-items-center gap-2 p-1 pe-2'>
                    <div className='btnpill'>
                        <img alt="" src={'/images/fries.png'} width="35" height="35" className="mt-1"/>
                    </div> Fries
                </button>
                <button onClick={() => changeCat("Pack")} className='btn btn-light btn-lg shadow-lg btn-rounded d-flex align-items-center gap-2 p-1 pe-2'>
                    <div className='btnpill'>
                        <img alt="" src={'/images/pack.png'} width="35" height="35" className="mt-1"/>
                    </div> Pack
                </button>
            </div>
            <h4 onClick={() => changeCat("")} className='menuall my-auto'>See All</h4>
          </div>

          <div className='container m-0 mb-5 row'>
            {data ? 
             data.map((item) => <PizzaCard img={item.img} title={item.title} price={item.price} desc={item.desc} id={item._id} key={item._id}/> )
             : "loading..."}
          </div>

      </div>
    );
  }
  
  export default Home;