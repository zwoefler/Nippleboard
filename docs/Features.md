# 🚀 FEATURES
- [X] Searchbar to search for sounds
- [X] Sound page: Name, URL, Play, Download
- [X] Add PauseButton as component
- [X] Click on Navbar to redirecto to Home
- [ ] Hover over name like a link
- [X] Delete search query in search bar with X in search bar

## Upload sounds with Metadata
- [ ] Database which holds metadata: name (UNIQUE), bucket_item (BUcket link item), source_url (String), description (String)
- [ ] When item exists in storage, throw error, already exists.
- [ ] When item with name already exits, throw error: Already exists.


## Soundbite Details
- [ ] On upload provide: soundfile <File>, source URL <string>, description <string>, name <string>, automatically set "storagePath".
- [ ] On SoundDetail Page: Show Name, Source URL, Description, Download Button, Play Button
- [ ] On SoundDetail Page: Have Save button to save changes made to name, description or source url
    - [ ] If name exists: Message --> "Sound with name xxx exists. "
    - [ ] Make existing sound playable + show name
- [ ] On Upload: Message: "Sound with name xxx exists. Saved as xxx(1)".
    - [ ] Saving duplicated sound as xyz.mp3 --> xyz(1).mp3
    - [ ] Saving duplicated sound name as xyz --> xyz(1)
