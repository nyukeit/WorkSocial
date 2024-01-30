import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet,TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ initialDate, onDateChange, style,maximumDate }) => {
  const [date, setDate] = useState(new Date(initialDate || Date.now()));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange(currentDate);
  };
 const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


return (
    <View style={[styles.datePickerContainer, style]}>
      <TextInput
        style={styles.input}
        placeholder="Select Date"
        value={formatDate(date)}
        editable={false}
      />
      <Button onPress={() => setShow(true)} title="Select Date" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    //width: '50%',
    //padding: 10,
    //borderBottomColor: 'black',
    //borderBottomWidth: 1,
    //marginBottom: 10,
  },
});
export default CustomDatePicker;