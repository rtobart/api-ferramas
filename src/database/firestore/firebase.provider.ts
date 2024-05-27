import { CategoryEntity } from "./entity/category.entity"
import { OrderEntity } from "./entity/order.entity"
import { ShoppingCartEntity } from "./entity/shopping_cart.entity"
import { StockEntity } from "./entity/stock.entity"
import { ToolEntity } from "./entity/tool.entity"
import { UserEntity } from "./entity/user.entity"

export const FirestoreDatabaseProvider = 'firestoredb'
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
    ToolEntity.collectionName,
    CategoryEntity.collectionName,
    UserEntity.collectionName,
    ShoppingCartEntity.collectionName,
    StockEntity.collectionName,
    OrderEntity.collectionName,
]
