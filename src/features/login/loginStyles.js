import { StyleSheet } from 'react-native';

const donationStyles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1
  },
  containerItem: {
    flex: 1
    // backgroundColor: 'red'
  },
  containerLoading: {
    marginTop: 40
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    padding: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  categoryItemMargin: {
    marginLeft: 5,
  },
  categorySelected: {
    backgroundColor: 'purple',
    color: '#ffff'
  },
  categoryUnselected: {
    borderColor: 'purple',
    borderWidth: 1,
    color: 'purple'
  },
  categorySelectedText: {
    color: '#ffff'
  },
  categoryUnselectedText: {
    color: 'purple'
  },
  beneficiariesItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonContainer: {
    marginTop: 40
  },
  button: {
    textAlign: 'center'
  },
  buttonText: {
    // color: '#fff'
  }
});

export default donationStyles;
