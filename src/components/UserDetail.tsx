import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { User } from '../types';

interface UserDetailProps {
  selectedUser: User;
}

function UserDetail({ selectedUser }: UserDetailProps) {
  return (
    <View>
      <Text style={styles.h2}>User Detail</Text>
      <View style={styles.content}>
        <View>
          <Text style={styles.row}>
            <Text style={styles.bold}>Name:</Text>
            {selectedUser.first_name}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.bold}>Last Name:</Text>
            {selectedUser.last_name}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.bold}>Email:</Text>
            {selectedUser.email}
          </Text>
        </View>
        <View>
          <Image source={{ uri: selectedUser.avatar }} style={styles.avatar} />
        </View>
      </View>
      <Button title="Close" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10
  },
  row: {
    paddingBottom: 5
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 10
  }
});

export default UserDetail;
