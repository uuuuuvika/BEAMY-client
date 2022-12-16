import "./Footer.css"
import rat from "./rat.png"

function Footer() {
    return (
        <div className="footer">
        <span className="p">made by <a href="https://github.com/uuuuuvika" target="_blank">uuuuuvika, </a>
            dedicated to <img style={{width: 20, height: 20}} src={rat} /> Beamy, who was the smartest rat,</span>
            <a href="https://www.flaticon.com/free-icons/rat" title="rat icons"> icons by Icongeek26 - Flaticon</a>
            <span> and by </span>
            <a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Freepik - Flaticon</a>
        </div>
    )
}

export default Footer;