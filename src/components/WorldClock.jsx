import { Component } from "react";
import Clock from "./Clock";

// Компонент WorldClock для управления списком часов
class WorldClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: [], // Список добавленных часов
      name: "", // Название нового часового пояса
      timezone: "", // Временная зона нового часового пояса
    };
  }

  // Обработчик для изменения названия часового пояса
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  // Обработчик для изменения временной зоны
  handleTimezoneChange = (event) => {
    this.setState({ timezone: event.target.value });
  };

  // Обработчик для добавления новых часов
  addClock = () => {
    const { name, timezone, clocks } = this.state;
    this.setState({
      clocks: [
        ...clocks,
        { name, timezone: parseInt(timezone), id: Date.now() },
      ],
      name: "", // Сброс поля названия
      timezone: "", // Сброс поля временной зоны
    });
  };

  // Обработчик для удаления часов
  removeClock = (id) => {
    this.setState({
      clocks: this.state.clocks.filter((clock) => clock.id !== id),
    });
  };

  render() {
    const { clocks, name, timezone } = this.state;

    return (
      <div>
        <div className="container">
          <div className="form-group">
            <label className="title" htmlFor="name">
              Название
            </label>
            <input
              className="input"
              id="name"
              type="text"
              placeholder=""
              value={name}
              onChange={this.handleNameChange}
            />
          </div>

          <div className="form-group">
            <label className="title" htmlFor="timezone">
              Временная зона
            </label>
            <input
              className="input"
              id="timezone"
              type="number"
              placeholder=""
              value={timezone}
              onChange={this.handleTimezoneChange}
            />
          </div>

          <button className="button-add" onClick={this.addClock}>Добавить</button>
        </div>

        <div className="clock-container">
          {clocks.map((clock) => (
            <Clock
              key={clock.id}
              {...clock}
              onRemove={() => this.removeClock(clock.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WorldClock;
