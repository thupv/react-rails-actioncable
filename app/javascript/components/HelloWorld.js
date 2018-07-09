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
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" name="fly_id" placeholder='fly Id' onChange={this.handleChange.bind(this)}/><br/>
        <input type="submit" value="Submit" onClick={this.submitBtnOnclick.bind(this)}/><br/>
        Seat available: {this.state.numberOfSeat} for fly id: {this.state.flyId}
      </React.Fragment>
    );
  }

  submitBtnOnclick(event) {
    this.chats.fetchAvailableSeat(this.flyId);
    event.preventDefault();
  }

  handleChange(event) {
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
        this.chats.fetchAvailableSeat('1');
      },
      received: (seat) => {
        console.log("Receive: ");
        console.log(seat);
        this.setState({
          numberOfSeat: seat.number,
          flyId: seat.id
        });
      },
      fetchAvailableSeat: function (flyId) {
        this.perform('fetch_available_seat', {
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
