import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.css';
import { toast } from 'react-toastify';

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "b7a9370e4b1b1517a2dc83f21996f7a4",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log('FILME NÃO ENCONTRADO!')
                navigate('/');
                return;
            })
      }
      loadFilme();

      return () => {
        console.log('Componente desmontado');
      };

    }, [id, navigate]);// Passar as dependencias que estão sendo passadas por fora do useEffects




    function salvarFilme()
    {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        // Se tiver filme igual já gravado
        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id) 
    
        if(hasFilme){
            toast.warn('Esse filme já está na sua lista!')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!')
    }




    if (loading)
    {
        return(
            <div className="filme">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return (
        <div className="filme">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme} className="green">Salvar</button>
                <button className="blue">
                    <a target='_blank' rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
  
}

export default Filme;