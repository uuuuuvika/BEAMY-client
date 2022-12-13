import "./Footer.css"
import rat from "./rat.png"

function Footer() {
    return (
        <div>
        <p className="p">made by <a href="https://github.com/uuuuuvika" target="_blank">uuuuuvika, </a>
            dedicated to <img style={{width: 20, height: 20}} src={rat} /> Beamy, who was the smartest rat</p>
        </div>
    )
}

export default Footer;