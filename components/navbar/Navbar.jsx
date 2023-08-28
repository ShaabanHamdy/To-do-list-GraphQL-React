import GraphqlImg from "../images/GraphQL-Logo-Vector.jpg";

const Navbar = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <img width={150} src={GraphqlImg} alt="" />
              <span className="h1 navTitle">GraphQL Project</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
