import React from "react";
import { useDispatch } from "react-redux";
import { forGeoCoder } from "../../../api/geocoder";
import { Row, Col, Button } from "react-bootstrap";
import { setSearchPosition } from "../../../redux/actions/mainActions";
function Search() {
  const dispatch = useDispatch();
  const [address, setAdderess] = React.useState("");
  const [variations, setVariations] = React.useState([]);

  function findCoordinates(e) {
    e.preventDefault();
    forGeoCoder(address).then((resp) => {
      if (resp.results[0]) {
        setVariations(resp.results);
      } else {
        setVariations([{ formatted: "не удалось найти адреса" }]);
      }
    });
  }

  function goToPoint(coordinates) {
    setVariations([]);
    setAdderess("");
    if (coordinates) {
      dispatch(setSearchPosition(coordinates));
    } else {
      dispatch(setSearchPosition(null));
    }
  }

  return (
    <>
      <Col className="form_block">
        <Row className="justify-content-center align-items-center form_block">
          <form onSubmit={findCoordinates}>
            <input
              required
              value={address}
              onChange={(e) => setAdderess(e.target.value)}
              type="text"
            />
            <Button type="submit" className="btn-sm">
              Поиск
            </Button>
            {variations[0] && <Button onClick={()=> {setVariations([]); setAdderess('')}} className="btn-sm btn-danger">X</Button>}
          </form>
        </Row>
        <Col className="justify-content-center align-items-center ">
          {variations[0] &&
            variations.slice(0, 4).map((variation, index) => (
              <Row
                className="justify-content-center align-items-center search_result"
                key={index}
              >
                <Button
                  onClick={() => goToPoint(variation.geometry)}
                  className="btn btn-sm animate__animated animate__slideInDown"
                >
                  {variation.formatted}
                </Button>
              </Row>
            ))}
        </Col>
      </Col>
    </>
  );
}

export default Search;
