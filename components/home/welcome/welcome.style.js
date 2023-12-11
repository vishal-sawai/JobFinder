import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  // container: {
  //   width: "100%",
  // },
  // userName: {
  //   fontFamily: FONT.regular,
  //   fontSize: SIZES.large,
  //   color: COLORS.tertiary,
  // },
  // welcomeMessage: {
  //   fontFamily: FONT.bold,
  //   fontSize: SIZES.xLarge,
  //   color: COLORS.primary,
  //   marginTop: 2,
  // },
  searchContainer: {
    marginBottom: SIZES.large,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    marginVertical: 5,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: 50,
    marginVertical: 2,
    paddingHorizontal: SIZES.large,
  },
  searchBtn: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  searchBtnImage: {
    height: "50%",
    tintColor: COLORS.white,
    marginLeft: "-5%",
    padding: 0,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
    margin: 5,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

export default styles;
