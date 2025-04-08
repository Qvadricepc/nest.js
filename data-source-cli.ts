import { createDataSource } from './src/data-source';

let dataSource: any;

(async () => {
  dataSource = await createDataSource();
})();

export default {
  get migrations() {
    return dataSource?.migrations || [];
  },
  get options() {
    return dataSource?.options || {};
  },
  initialize() {
    return dataSource.initialize();
  },
  runMigrations() {
    return dataSource.runMigrations();
  },
  revertLastMigration() {
    return dataSource.undoLastMigration();
  },
};
