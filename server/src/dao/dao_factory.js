import DynamoDbDAO from './dynamo_db_dao.js';
import FileSystemDAO from './file_system_dao.js';

class DAOFactory {
  constructor() {
    this.dao_ = null;
  }

  init(cfg) {
    const dataSource = cfg.dataSource;
    if (dataSource === 1) {
      console.log('Creating FileSystemDAO');
      this.dao_ = new FileSystemDAO();
    } else if (dataSource === 2) {
      console.log('Creating DynamoDbDAO');
      this.dao_ = new DynamoDbDAO();
    }
  }

  getDAO() {
    return this.dao_;
  }
}

DAOFactory.init = function(cfg) {
  if (!DAOFactory.singleton_) {
    DAOFactory.singleton_ = new DAOFactory();
  }
  DAOFactory.singleton_.init(cfg);
};

DAOFactory.getDAO = function() {
  return DAOFactory.singleton_.getDAO();
};

DAOFactory.singleton_;

export default DAOFactory;

