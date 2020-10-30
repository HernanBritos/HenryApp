import React from 'react';
import Participantes from '../../screens/Participantes/Participantes'
import General from '../../screens/General/General'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ParticipantesRoutes from "../ParticipantesRoutes/ParticipantesRoutes"

const PmTabTop = createMaterialTopTabNavigator()


export default function PmRoutes({route}) {
    console.log(route.params);
    
    return (
      <PmTabTop.Navigator>
        <PmTabTop.Screen initialParams={{id: route.params.id, screen:"Group"}} name="Pm"  component={General} />
        <PmTabTop.Screen initialParams={{id: route.params.id, screen:"Group"}}  name="Participantes" component={ParticipantesRoutes} />
      </PmTabTop.Navigator>
    );
  }