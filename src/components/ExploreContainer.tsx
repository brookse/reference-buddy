import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { Episode, Season } from '../models';
import './ExploreContainer.css';
import { pauseCircleOutline, playCircleOutline } from 'ionicons/icons';

interface ContainerProps {
  episode: Episode;
  season: Season;
}

const ExploreContainer: React.FC<ContainerProps> = ({ season, episode }) => {
  const [activeRef, setActiveRef] = useState<number>(-1);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timerString, setTimerString] = useState<string>('');
  // const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number>(0);

  function increment() {
    setSecondsElapsed(secondsElapsed => secondsElapsed + 1);
  }

  useEffect(() => {
    if (isPlaying) {
      let i = window.setInterval(increment, 1000);
      setIntervalId(i)
    } else if (!isPlaying) {
      clearInterval(intervalId);
    }
  }, [isPlaying]);

  useEffect(() => {
    checkActiveRef();
  }, [secondsElapsed]);

  function checkActiveRef() {
    let nextRef = episode.references[activeRef+1];
    if (nextRef) {
      // update the time
      let secondsDiff = secondsElapsed;
      let m = Math.floor((secondsDiff) / 60); // whole minutes
      let s = Math.floor((secondsDiff) % 60);  // remaining seconds
      if (m !== NaN && s !== NaN) setTimerString(`${m}:${s < 10 ? `0${s}` : s}`)

      // if the current time is at or beyond a ref, but the next hasn't passed, don't update
      if (m >= nextRef.time_m && s >= nextRef.time_s) {
        setActiveRef(activeRef+1);
      }
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <div className="episode-info">
          <h1>S{season.number} E{episode.number} - {episode.title}</h1>
          <h5>Originally aired {episode.air_date}</h5>
        </div>
        <div className="watchalong">
          <h5>Play as I watch: {isPlaying}</h5>
          <div className="timer">
            { isPlaying &&
              <IonButton onClick={() => setIsPlaying(false)} className="timer-button"><IonIcon src={pauseCircleOutline}></IonIcon></IonButton>
            }
            { !isPlaying &&
              <IonButton onClick={() => setIsPlaying(true)} className="timer-button"><IonIcon src={playCircleOutline}></IonIcon></IonButton>
            }
          </div>
          <p>{timerString}</p>
        </div>
      </div>

      <IonGrid>
        { episode.references.map((ref, index) => (
          <IonRow className={activeRef === index ? 'active' : ''} key={index}>
            <IonCol size={"2"} className="timestamp" onClick={() => setActiveRef(index)}>
              {ref.time_m}:{ref.time_s < 10 ? `0${ref.time_s}` : ref.time_s}
            </IonCol>
            <IonCol className={activeRef === index ? 'reference-body active' : 'reference-body'}>
              <h5 className="quote">"{ref.quote}"</h5>
              { activeRef === index &&
                <div>
                  <h5>{ref.subject}</h5>
                  <h5>{ref.body}</h5>
                </div>
              }
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </div>
  );
};

export default ExploreContainer;
