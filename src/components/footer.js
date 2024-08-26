import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <h4>Pages</h4>
                <h5><Link to='/'>Homepage</Link></h5>
                <h5><Link to='/getpicks'>Get Picks</Link></h5>
                <h5><Link to='/results'>Past Results</Link></h5>
                <h5><Link to='/account'>Account/Login</Link></h5>
            </div>
            <div>
                <h4>Other Links</h4>
                <h5><Link to='/privacy'>Privacy Policy</Link></h5>
                {/* <h5><Link to='/toc'>Terms Of Service</Link></h5> */}
                <h5><Link to='/contact'>Contact</Link></h5>
            </div>
            <div></div>
        </div>
    )
}

export default Footer;