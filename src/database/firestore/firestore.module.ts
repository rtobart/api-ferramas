import { DynamicModule, Module } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import {
  FirestoreCollectionProviders,
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
} from './firebase.provider';
import { ToolCollection } from './collection/tool.collection';
import { CategoryCollection } from './collection/category.collection';
import { UserCollection } from './collection/use.collection';
import { ShoppingCartCollection } from './collection/shopping_cart.collection';
import { StockCollection } from './collection/stock.collection';
import { OrderCollection } from './collection/order.collection';

type FirestoreModuleOptions = {
  imports: any[];
  useFactory: (...args: any[]) => Settings;
  inject: any[];
};

@Module({
  providers: [
    ToolCollection,
    CategoryCollection,
    UserCollection,
    ShoppingCartCollection,
    StockCollection,
    OrderCollection,
  ],
  exports: [
    ToolCollection,
    CategoryCollection,
    UserCollection,
    ShoppingCartCollection,
    StockCollection,
    OrderCollection,
  ],
})

export class FirestoreModule {
    static forRoot (options: FirestoreModuleOptions): DynamicModule {
      const optionsProvider = {
        provide: FirestoreOptionsProvider,
        useFactory: options.useFactory,
        inject: options.inject,
      }
  
      const firestoreProvider = {
        provide: FirestoreDatabaseProvider,
        useFactory: config => {
          config.credentials.private_key = Buffer.from(
            config.credentials.private_key,
            'base64',
          ).toString()
  
          return new Firestore(config)
        },
        inject: [FirestoreOptionsProvider],
      }
      const collectionProviders = FirestoreCollectionProviders.map(
        providerName => ({
          provide: providerName,
          useFactory: db => db.collection(providerName),
          inject: [FirestoreDatabaseProvider],
        }),
      )
  
      return {
        global: true,
        module: FirestoreModule,
        imports: options.imports,
        providers: [optionsProvider, firestoreProvider, ...collectionProviders],
        exports: [firestoreProvider, ...collectionProviders],
      }
    }
  }