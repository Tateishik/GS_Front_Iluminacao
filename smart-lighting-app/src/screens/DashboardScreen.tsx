import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { getLightStatus, setLightStatus } from '../services/api';

const DashboardScreen = () => {
  const [lightIntensity, setLightIntensity] = useState(0);
  const [isLightOn, setIsLightOn] = useState(false);

  useEffect(() => {
    const fetchLightStatus = async () => {
      try {
        const status = await getLightStatus();
        setLightIntensity(status.intensity);
        setIsLightOn(status.isOn);
      } catch (error) {
        console.error('Erro ao buscar status da luz:', error);
      }
    };

    fetchLightStatus();
    // Idealmente, você configuraria um intervalo para atualizar periodicamente
  }, []);

  const toggleLight = async () => {
    try {
      const newStatus = await setLightStatus(!isLightOn);
      setIsLightOn(newStatus.isOn);
    } catch (error) {
      console.error('Erro ao alterar status da luz:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Iluminação</Text>
      <Text>Intensidade da Luz Natural: {lightIntensity}%</Text>
      <View style={styles.switchContainer}>
        <Text>Iluminação Pública: </Text>
        <Switch value={isLightOn} onValueChange={toggleLight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default DashboardScreen;

