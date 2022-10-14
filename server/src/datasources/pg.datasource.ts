import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'memory',
  connector: 'postgresql',
  url: 'postgres://postgres:mypassword@localhost/postgres',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mypassword',
  database: 'postgres'
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pg';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pg', {optional: true})
    dsConfig: object = config,
  ) {
    Object.assign(dsConfig, {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
    super(dsConfig);
  }
}
