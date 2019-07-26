import React, { Component } from 'react';
// import logo from '../../logo.svg';
import '../../App.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import CityWeather from '../components/City';
import * as weatherService from '../actions/index';

class App extends Component {
    componentDidMount() {
        this.props.fetchCity();
    }
    render() {
        return (
            <div className="App">
                <Container>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">WEATHER APP</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                {
                                    <NavDropdown title="Cities" id="basic-nav-dropdown">
                                        {this.props.cities.map(city => (
                                            <NavDropdown.Item key={city.id} onClick={() => this.props.selectCity(city)}>
                                                {city.name}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.props.selectedCity !== 0 && <CityWeather cityId={this.props.selectedCity} />}
                </Container>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCity: () => dispatch(weatherService.getCities()),
        selectCity: city => dispatch(weatherService.selectCity(city)),
    };
};

const mapStateToProps = state => {
    return {
        cities: state.reducerCity.cities,
        selectedCity: state.reducerSelectCity.selectedCity,
        weatherInfoDetail: state.reducerWeatherDetail.weatherInfoDetail,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
