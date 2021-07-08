import { Button, message } from 'antd';
import { useEffect, useState } from 'react';

const levels = {
  0: 0,
  15: 1,
  30: 2,
  40: 3,
  dauce: 4,
  advantage: 5,
};

const successors = {
  0: 15,
  15: 30,
  30: 40,
  40: 'dauce',
  dauce: 'advantage',
  advantage: 'won',
};

function App() {
  const [scores, setScores] = useState([0, 0]);
  const [firstPlayerScore, secondPlayerScore] = scores;

  function handleFirstPlayerClick() {
    setScores([successors[scores[0]], scores[1]]);
  }

  function handleSecondPlayerClick() {
    setScores([scores[0], successors[scores[1]]]);
  }

  function restart(player) {
    message.info(`${player} player won!`);
    setScores([0, 0]);
  }

  useEffect(() => {
    const [first, second] = scores;

    if (first === 40 && second === 40) {
      return setScores(['dauce', 'dauce']);
    }

    if (first === 'advantage' && second === 'advantage') {
      return setScores(['dauce', 'dauce']);
    }

    if (first === 'dauce' && levels[second] <= 2) {
      return setScores(['won', scores[1]]);
    }

    if (second === 'dauce' && levels[first] <= 2) {
      return setScores([scores[0], 'won']);
    }

    if (first === 'won') {
      return restart('First');
    }

    if (second === 'won') {
      return restart('Second');
    }
  }, [scores]);

  return (
    <div className="container">
      <div className="player">
        <Button size="large" onClick={handleFirstPlayerClick}>
          First Player
        </Button>
        <span className="score">{firstPlayerScore}</span>
      </div>
      <div className="player">
        <Button size="large" onClick={handleSecondPlayerClick}>
          Second Player
        </Button>
        <span className="score">{secondPlayerScore}</span>
      </div>
    </div>
  );
}

export default App;
