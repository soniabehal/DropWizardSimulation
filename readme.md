# DropWizard Simulation

This project is simulation dropwizard **browser-based file system**.

## Dependency Installation

Install the dependencies with node package manager.

```bash
npm i
```

## Server 

Start the application server by one of the following command

```bash
node app.js
```
OR
```bash
npm start
```

## Api Usage

#### View all folders
Api to view all the active folders.

```
curl app_domain:port/folder
```

#### Create folders or folder
To create more than one folder.

```
curl -XPOST -H "Content-type: application/json" -d '{
  "folder": [
    {
      "name": "folder1"
    },
    {
      "name": "folder2"
    }
  ]
}' 'app_domain:port/folder'
```
To create exactly folder.
```
curl -XPOST -H "Content-type: application/json" -d '{
  "folder": {
    "name": "folder11"
  }
}' 'app_domain:port/folder'
```

#### Create new files or subfolders in the folder
To create more than one file or subfolders.

```
curl -XPOST -H "Content-type: application/json" -d '{
  "folder": [
    {
      "name": "file1.txt"
    },
    {
      "name": "subfolder"
    }
  ]
}' 'app_domain:port/content/folderId'
```
To create exactly file or subfolder.
```
curl -XPOST -H "Content-type: application/json" -d '{
  "folder": {
    "name": "subfolder or file2.txt"
  }
}' 'app_domain:port/content/folderId'
```

#### Contents of folder
To view contents of a folder.

```
curl -XGET 'app_domain:port/content/folderId'
```

#### Delete parent folder
To delete the main folder.

```
curl -XDELETE 'app_domain:port/folder/folderId'
```

#### Delete subfolder or file
To delete the subfolder or file.

```
curl -XDELETE 'app_domain:port/content/subfolderId_or_fileId'
```

#### Rename parent file
To delete the main folder.

```
curl -XPUT -H "Content-type: application/json" -d '{
	"name":"new name"
}' 'app_domain:port/folder/folderId'
```

#### Rename subfolder or file
To delete the main folder.

```
curl -XPUT -H "Content-type: application/json" -d '{
	"name":"new name"
}' 'app_domain:port/content/folderId'
```

## Assumptions
1. System is designed for single user, but schema is scalable.
2. All the fileinput name with .zip and name without dot is considered to be a folder, else file. 
3. Considering the scalability system is designed as parent and child components for main folder and subfolders.
4. Folder Id is the mongoDB object id, can be mapped to unique readable id.

## License
[MIT](https://choosealicense.com/licenses/mit/)