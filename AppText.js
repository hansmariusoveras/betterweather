import { StyleSheet, Text } from 'react-native';

const AppText = (props) => {
    return <Text style={styles.text}>{props.children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        fontFamily: 'Helvetica'
    }
  });

export default AppText;