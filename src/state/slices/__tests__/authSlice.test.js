import reducer,{ setIsUserLogin } from '../authSlice';

describe('authSliceTest', () => {
  const initialState = {
    isUserLoggedIn: false,
  };



  it('should handle setIsUserLogin to true', () => {
    const actual = reducer(initialState, setIsUserLogin(true));
    expect(actual.isUserLoggedIn).toEqual(true);
  });

  it('should handle setIsUserLogin to false', () => {
    const modifiedState = { isUserLoggedIn: true };
    const actual = reducer(modifiedState, setIsUserLogin(false));
    expect(actual.isUserLoggedIn).toEqual(false);
  });
});