import "./App.scss";
import bg from "./404.webp";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <img src={bg} alt="404" className="not-found-bg" />
      <h1 className="not-found-title">Попу мыл, джанес ?</h1>
    </div>
  );
}

export default NotFoundPage;
