import { Component } from "react";
import PropTypes from "prop-types";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(), // Текущее время
    };
  }

  componentDidMount() {
    // Устанавливаем интервал для обновления времени каждую секунду
    this.intervalId = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    // Очищаем интервал при удалении компонента
    clearInterval(this.intervalId);
  }

  // Получаем время с учетом смещения часового пояса
  getTimeWithOffset = (date, offset) => {
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  };

  render() {
    const { name, timezone, onRemove } = this.props;
    const { time } = this.state;
    const timeWithOffset = this.getTimeWithOffset(time, timezone);

    const seconds = timeWithOffset.getSeconds();
    const minutes = timeWithOffset.getMinutes();
    const hours = timeWithOffset.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6;
    const hourDeg = (hours % 12) * 30 + minutes / 2;

    return (
        <div className="clock-item">
          <h3 className="city-name">{name}</h3>
          <div className="container">
            <div className="clock">
              <div
                className="hand hour"
                style={{ transform: `rotate(${hourDeg}deg)` }}
              ></div>
              <div
                className="hand minute"
                style={{ transform: `rotate(${minuteDeg}deg)` }}
              ></div>
              <div
                className="hand second"
                style={{ transform: `rotate(${secondDeg}deg)` }}
              ></div>
            </div>
            <div>
              <button className="button-off" onClick={onRemove}>
                x
              </button>
            </div>
          </div>
        </div>
    );
  }
}

// Определение prop-types для компонента Clock
Clock.propTypes = {
  name: PropTypes.string.isRequired, // Название часового пояса, обязательное строковое значение
  timezone: PropTypes.number.isRequired, // Временная зона, обязательное числовое значение
  onRemove: PropTypes.func.isRequired, // Функция для удаления часов, обязательное значение типа функция
};

export default Clock;
