import Title from "./Title";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function Header({ title, titleType, value, onChange, onClick }) {
    return (
        <div className="header">
            <Title title={title} type={titleType} />
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorite Movies</Link>
            <button onClick={onClick} className="header__theme">
                Change theme
            </button>
            <SearchBar value={value} onChange={onChange} />
        </div>
    );
}
