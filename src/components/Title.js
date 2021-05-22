export default function Title({ title, type }) {
    switch (type) {
        case "h1":
            return <h1 className="title">{title}</h1>;
        case "h2":
            return <h2 className="title">{title}</h2>;
        case "h3":
            return <h3 className="title">{title}</h3>;
        default:
            return <h2 className="title">{title}</h2>;
    }
}
