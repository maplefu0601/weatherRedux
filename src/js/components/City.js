import React, { Component } from 'react';
import { Card, Button, Col, Form } from 'react-bootstrap';
import '../../App.css';
import { connect } from 'react-redux';
import * as weatherService from '../actions/index';
import WeatherDetail from './WeatherDetail';

class CityWeather extends Component {
    componentDidMount() {
        this.props.fetchWeather(this.props.city.id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.city.id !== this.props.city.id) {
            this.props.fetchWeather(this.props.city.id);
        }
    }
    render() {
        return (
            <div>
                <Card className="text-left">
                    <Card.Header>
                        City: {this.props.city.name}, {this.props.city.country}
                    </Card.Header>
                    {this.props.weatherInfo.weather && (
                        <Card.Body>
                            <Form.Row>
                                <Col>
                                    <Card.Text>{this.props.weatherInfo.weather[0].main}</Card.Text>
                                    <Card.Text>{this.props.weatherInfo.weather[0].description}</Card.Text>
                                    <Card.Text>Tempture: {this.props.weatherInfo.main.temp}</Card.Text>
                                    <Card.Text>
                                        Wind: {this.props.weatherInfo.wind.deg}º {this.props.weatherInfo.wind.speed} m/s
                                    </Card.Text>
                                </Col>
                                <Col className="flex">
                                    <Button
                                        variant="secondary"
                                        className="bottom"
                                        onClick={() => this.props.showForecast(this.props.city.id)}
                                    >
                                        5 day forecast
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Card.Body>
                    )}
                </Card>
                {this.props.showWeatherInfoDetail && <WeatherDetail />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('city state:', state);
    return {
        city: state.reducerSelectCity.selectedCity,
        weatherInfo: state.reducerWeather.weatherInfo,
        weatherInfoDetail: state.reducerWeatherDetail.weatherInfoDetail,
        showWeatherInfoDetail: state.reducerWeatherDetail.show,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchWeather: cityId => {
            dispatch(weatherService.getWeather(cityId));
        },
        showForecast: cityId => dispatch(weatherService.getWeatherDetail(cityId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CityWeather);
