import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { Show } from '../models';
import './Page.css';

const Page: React.FC = () => {

  const the_office: Show = {
    seasons: [{
      number: 3,
      episodes: [
        {
          title: "Grief Counseling",
          air_date: "October 12, 2008",
          number: 4,
          runtime_m: 23,
          runtime_s: 0,
          references: [
            {
              time_m: 0,
              time_s: 15,
              quote: "The quote",
              subject: "The subject",
              body: "A long explanation of the reference"
            },
            {
              time_m: 0,
              time_s: 32,
              quote: "The quote2",
              subject: "The subject2",
              body: "A long explanation of the reference2"
            },
            {
              time_m: 1,
              time_s: 4,
              quote: "The quote3",
              subject: "The subject3",
              body: "A long explanation of the reference3"
            },
            {
              time_m: 1,
              time_s: 32,
              quote: "The quote4",
              subject: "The subject4",
              body: "A long explanation of the reference4"
            },
            {
              time_m: 2,
              time_s: 16,
              quote: "The quote5",
              subject: "The subject5",
              body: "A long explanation of the reference5"
            }
          ]
        }
      ]

    }]
  };

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer season={the_office.seasons[0]} episode={the_office.seasons[0].episodes[0]} />

      </IonContent>
    </IonPage>
  );
};

export default Page;
