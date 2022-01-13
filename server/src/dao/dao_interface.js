/*
 * The DAO (Data Access Object) pattern is a useful design pattern when we
 * want to abstract away the source of data.
 *
 * For more info, see:
 * https://www.oracle.com/java/technologies/dataaccessobject.html
*/
class DAOInterface {
  listNearbyChefs(lat, lng) {
    throw Error('Derived class should implement "listNearbyChefs()"');
  }

  getCards(chefIds) {
    throw Error('Derived class should implement "getCards()"');
  }

  getMenu(chefId) {
    throw Error('Derived class should implement "getMenu()"');
  }
}

export default DAOInterface;

