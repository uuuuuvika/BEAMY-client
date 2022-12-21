import "./Search.css"

function Search(props) {
    
    const handleChange = (e) => {
        e.preventDefault();
        props.setSearchTerm(e.target.value);
    };
    
    return (
    <div className="search">
        <input
            type="search"
            placeholder="search decks here"
            onChange={handleChange}
            value={props.searchTerm} />
    </div>)
};

export default Search;