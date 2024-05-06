import { CategoryEntity } from "./entity/category.entity"
import { ToolEntity } from "./entity/tool.entity"
import { UserEntity } from "./entity/user.entity"

export const FirestoreDatabaseProvider = 'firestoredb'
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
    ToolEntity.collectionName,
    CategoryEntity.collectionName,
    UserEntity.collectionName,
]
