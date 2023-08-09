const ViewNotority = ({ language, notoriety }) => {
    console.log(language)
    return (
        Object.entries(notoriety).map((k) => { 
            if(k[0] === language) { 
                return (
                    <span>{k[0]}:{k[1]}&nbsp;</span>
                )
            }
        })
    );
}

export default ViewNotority;