import Link from 'next/link';
const ViewGraphButton = ({ id, labelprolexme, language }) =>{
    return (
        language 
        ? <Link href={`/graphs?id=${id}&labelprolexme=${labelprolexme}&lng=${language}`}passHref>
            <button>View Graph</button>
          </Link>
        : <span>&nbsp;</span>
    );
}

export default ViewGraphButton;