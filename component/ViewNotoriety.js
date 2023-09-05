const ViewNotority = ({ language, notoriety }) => {
  return (
    Object.entries(notoriety).map((k) => { 
      if(k[0] === language) { 
        return (
          <span key={k}>{k[0]}:{k[1]}&nbsp;</span>
        )
      }
    })
  );
}

export default ViewNotority;