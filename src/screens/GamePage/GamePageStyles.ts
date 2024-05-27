import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  mistakes: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 2,
    borderColor: '#ddd',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  number_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFS500',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 10,
  },
  number: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  selected_number: {
    backgroundColor: 'black',
    borderRadius: 20,
  },
  number_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  gapColumn: {
    marginRight: 4, 
  },
  gapRow: {
    marginBottom: 4, 
  },
  help:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  help_button:{
    flexDirection: 'row',
    backgroundColor: '#333', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 2,
  },
  submit_button:{
  backgroundColor: '#333',  
  paddingVertical: 12,       
  paddingHorizontal: 24,     
  borderRadius: 50,           
  alignItems: 'center',      
  justifyContent: 'center',  
  marginBottom: 10,
  width: 200,
  marginLeft: 90
  }
});

export default styles;
