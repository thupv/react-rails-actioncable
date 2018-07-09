import React from "react"
import PropTypes from "prop-types"
import * as Cable from "actioncable";

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSeat: 0,
      flyId: 0
    };
    this.flyId = '1';
    this.numberOfSeat = '1';
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" name="fly_id" placeholder='fly Id' onChange={this.handleChangeFlyId.bind(this)}/><br/>
        <input type="submit" value="Submit" onClick={this.fetchBtnOnclick.bind(this)}/><br/>
        <input type="text" name="seat" placeholder='number of seat' onChange={this.handleChangeSeat.bind(this)}/><br/>
        <input type="submit" value="Take" onClick={this.takeBtnOnclick.bind(this)}/><br/>
        Seat available: {this.state.numberOfSeat} for fly id: {this.state.flyId}
      </React.Fragment>
    );
  }

  fetchBtnOnclick(event) {
    this.chats.fetchAvailableSeat(this.flyId);
    event.preventDefault();
  }

  takeBtnOnclick(event) {
    this.chats.takeSeat(this.numberOfSeat, this.flyId);
    event.preventDefault();
  }

  handleChangeSeat(event) {
    this.numberOfSeat = event.target.value;
  }

  handleChangeFlyId(event) {
    this.flyId = event.target.value;
  }

  componentWillMount() {
    this.createSocket();
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    this.chats = cable.subscriptions.create({
      channel: 'SeatChannel'
    }, {
      connected: () => {
        this.chats.fetchAvailableSeat(this.flyId);
      },
      received: (seat) => {
        console.log("Receive: ");
        console.log(seat);
        if (this.flyId === seat.id.toString()) {
          this.setState({
            numberOfSeat: seat.number,
            flyId: seat.id
          });
        }
      },
      fetchAvailableSeat: function (flyId) {
        this.perform('fetch_available_seat', {
          id: flyId
        });
      },
      takeSeat: function (noOfSeat, flyId) {
        this.perform('take_seat', {
          noOfSeat: noOfSeat,
          id: flyId
        });
      }
    });
  }

  componentDidMount() {

  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
