import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { User } from '../types';
import UserDetail from './UserDetail';
import { Color, Const } from '../constants';

function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleUserPress = (user: User) => {
    setSelectedUser(user);
  };

  const renderItem = ({ item }: { item: User }) => {
    const isSelected = selectedUser && selectedUser.id === item.id;

    return (
      <TouchableOpacity onPress={() => handleUserPress(item)}>
        <View style={styles.content}>
          <Image
            source={{
              uri: item.avatar
            }}
            style={isSelected ? styles.avatarSelected : styles.avatar}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  function loadUsers() {
    fetch(Const.USERS_URL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsers(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <View>
      <Text style={styles.h1}>User List</Text>

      <View style={styles.container}>
        <FlatList
          data={users}
          horizontal={false}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {selectedUser && <UserDetail selectedUser={selectedUser} />}
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  container: {},
  avatar: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10
  },
  avatarSelected: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: Color.PRIMARY
  },
  content: {
    margin: 15
  }
});

export default UserList;
