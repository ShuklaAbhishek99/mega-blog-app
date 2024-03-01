/* eslint-disable no-unreachable */
// this config is for databases, storage, query, etc related services

import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create document
    async createPost({ title, slug, content, featuredImage, status, UserId }) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                // can also take ID.unique() instead of slug
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    UserId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false;
        }
    }

    // update document
    async updatePost(slug, { title, content, featuredImage, status }) {
        // one mistake in docs, we also have to include object as last parameter in updateDocument
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    // delete document
    async deleteDocument(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );

            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // get single document
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteDatabaseId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Queries (whatever List we want, we give query about that),
    // in this case get all docs/posts where status is active
    // Query.equal("key", "value")
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                // we can also write all our queries in this way wrapped in array
                // instead of passing it as parameters
                // [Query.equal("status", "active")]
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // file upload services/methods (Storage)
    // Upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // file Preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;
