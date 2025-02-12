import cartIcon from "images/cart-icon.pnj";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Amazon</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/products">Products</a>
        <a href="/cart" className="cart-container">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </a>
      </div>
    </nav>
  );
}
