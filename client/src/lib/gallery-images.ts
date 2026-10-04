// Gallery images from lcfdumayo.com — exact same images, same years
// All URLs are from the live Wix CDN

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryYear {
  year: number;
  label: string;
  images: GalleryImage[];
}

export const GALLERY_YEARS: GalleryYear[] = [
  {
    year: 2017,
    label: 'VII Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/f2bc97_adbabe1b601a45c5a80913424e92f900~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_adbabe1b601a45c5a80913424e92f900~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_d72e45d3983f46ff8e8f35bda841a4df~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_d72e45d3983f46ff8e8f35bda841a4df~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_f858be42cf76439aad760252c99d71e0~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_f858be42cf76439aad760252c99d71e0~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_4ac7902308d2471fae77f2e3393285d0~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_4ac7902308d2471fae77f2e3393285d0~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_0ffd41d44f7e4d0a97495909144f1b78~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_0ffd41d44f7e4d0a97495909144f1b78~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c79a0cd17ac945c58625d0f2a80f776f~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_c79a0cd17ac945c58625d0f2a80f776f~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_b138eed3874b4e33ae89071394fb63b3~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_b138eed3874b4e33ae89071394fb63b3~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_680daf631a114ea09105f09a25f18164~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_680daf631a114ea09105f09a25f18164~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_d53dbffa35dc450db638d60becd24fbc~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_d53dbffa35dc450db638d60becd24fbc~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_60542f52598d4149bf14ba5ce923bfd2~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_60542f52598d4149bf14ba5ce923bfd2~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_3088d3eb5a3a420b9e6d25db3ed1be0a~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_3088d3eb5a3a420b9e6d25db3ed1be0a~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_31f5c993ce3047939ece0f3fa3d5c7de~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_31f5c993ce3047939ece0f3fa3d5c7de~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_3b09ca0e36154747b48507569e064a55~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_3b09ca0e36154747b48507569e064a55~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_9b302d74cf214a9397de90ed1f38852b~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_9b302d74cf214a9397de90ed1f38852b~mv2.jpg', alt: 'Gallery 2017' },
      { src: 'https://static.wixstatic.com/media/f2bc97_4212005cf3a14e7584d879c43c26d441~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_4212005cf3a14e7584d879c43c26d441~mv2.jpg', alt: 'Gallery 2017' },
    ],
  },
  {
    year: 2018,
    label: 'VIII Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/f2bc97_1160bc4da6484f0fb5645ce238bca093~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_1160bc4da6484f0fb5645ce238bca093~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c69f36f2e62b4beebbf1c7f1bb5fd681~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_c69f36f2e62b4beebbf1c7f1bb5fd681~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_0b784df1517f4ba3bbe395a95be4522a~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_0b784df1517f4ba3bbe395a95be4522a~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_97d9c81c3ec44978bb87d9c56dd1c041~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_97d9c81c3ec44978bb87d9c56dd1c041~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_24eb7776c6b0468e9786acd15cc9efd9~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_24eb7776c6b0468e9786acd15cc9efd9~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_23711d400db147d2a7e928a68d176f77~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_23711d400db147d2a7e928a68d176f77~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_fb078747a0d841d19be2c62b948427a4~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_fb078747a0d841d19be2c62b948427a4~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c2cd9abf05c94e5398b13a2b428d08fe~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_c2cd9abf05c94e5398b13a2b428d08fe~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_ca45e776128a40869ab4e41c83113f51~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_ca45e776128a40869ab4e41c83113f51~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_873ed604169244f7b4b5a2a36d0e2bb0~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_873ed604169244f7b4b5a2a36d0e2bb0~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_3613244eb2b94407b57fb30650050034~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_3613244eb2b94407b57fb30650050034~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_e6f17a5e1b084e84aa17316472608cab~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_e6f17a5e1b084e84aa17316472608cab~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_bf28241d8fd24599863676e23c9e8e4a~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_bf28241d8fd24599863676e23c9e8e4a~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c0427089c4134e8a9ba93aeb2c7b6e6a~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_c0427089c4134e8a9ba93aeb2c7b6e6a~mv2.jpg', alt: 'Gallery 2018' },
      { src: 'https://static.wixstatic.com/media/f2bc97_711d56e044c84c419111d38e577c4bc8~mv2.jpg/v1/fill/w_800,h_800,q_90/f2bc97_711d56e044c84c419111d38e577c4bc8~mv2.jpg', alt: 'Gallery 2018' },
    ],
  },
  {
    year: 2019,
    label: 'IX Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/f2bc97_fef0132a213d419aae87e8e0327c4573~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_fef0132a213d419aae87e8e0327c4573~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_feb3180864f34409b064ceccd2bd2a0f~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_feb3180864f34409b064ceccd2bd2a0f~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_5be6e1868ce640e49931a7e2a2dc20bb~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_5be6e1868ce640e49931a7e2a2dc20bb~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c0d1de8fb9f1433e8f8354f10fe27053~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_c0d1de8fb9f1433e8f8354f10fe27053~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_3d6069b98a8446d9bdc6b581e223a93e~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_3d6069b98a8446d9bdc6b581e223a93e~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c58b411f955d4a9a84684451335136d9~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_c58b411f955d4a9a84684451335136d9~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_dba78e8a59d24adebec4571cceffa484~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_dba78e8a59d24adebec4571cceffa484~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_9817dbf00a6f424fbc15222d89b78904~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_9817dbf00a6f424fbc15222d89b78904~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_26fa3785e0a2402e91ed52d763aa46ae~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_26fa3785e0a2402e91ed52d763aa46ae~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_a7600444ee4241a2a1b57f15dd482953~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_a7600444ee4241a2a1b57f15dd482953~mv2.jpg', alt: 'Gallery 2019' },
      { src: 'https://static.wixstatic.com/media/f2bc97_f09231f89264450794b9ed172221e02c~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_f09231f89264450794b9ed172221e02c~mv2.jpg', alt: 'Gallery 2019' },
    ],
  },
  {
    year: 2021,
    label: 'X Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/f2bc97_f013092c442e4f44a88cd9d5076e626e~mv2.jpg/v1/fill/w_980,h_489,q_68/f2bc97_f013092c442e4f44a88cd9d5076e626e~mv2.jpg', alt: 'Gallery 2021' },
      { src: 'https://static.wixstatic.com/media/f2bc97_fdd061b9f8db44d2908ed34bb294741c~mv2.jpg/v1/fill/w_980,h_489,q_68/f2bc97_fdd061b9f8db44d2908ed34bb294741c~mv2.jpg', alt: 'Gallery 2021' },
      { src: 'https://static.wixstatic.com/media/f2bc97_0ee5a56e9c2943f6a71ea9993c29b469~mv2.jpg/v1/fill/w_980,h_489,q_68/f2bc97_0ee5a56e9c2943f6a71ea9993c29b469~mv2.jpg', alt: 'Gallery 2021' },
      { src: 'https://static.wixstatic.com/media/f2bc97_fd41e7824aaa4af19dd6ead8b633fb78~mv2.jpg/v1/fill/w_980,h_489,q_68/f2bc97_fd41e7824aaa4af19dd6ead8b633fb78~mv2.jpg', alt: 'Gallery 2021' },
      { src: 'https://static.wixstatic.com/media/f2bc97_6ccaa946db554b46af6d6c32ca825dd6~mv2.jpg/v1/fill/w_980,h_489,q_68/f2bc97_6ccaa946db554b46af6d6c32ca825dd6~mv2.jpg', alt: 'Gallery 2021' },
    ],
  },
  {
    year: 2022,
    label: 'XI Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/f2bc97_19c5ac9567ca44a7aa6a2d85b004c472~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_19c5ac9567ca44a7aa6a2d85b004c472~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_b4c2564dbb1f4f8bb7a646de934283f8~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_b4c2564dbb1f4f8bb7a646de934283f8~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_970082996f6f4095a5d4db5e1e308901~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_970082996f6f4095a5d4db5e1e308901~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_b77588a88b2a40778b395a2c290477c7~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_b77588a88b2a40778b395a2c290477c7~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_f3208230a31c49d0a14813a3587dea73~mv2.jpeg/v1/fill/w_980,h_655,q_68/f2bc97_f3208230a31c49d0a14813a3587dea73~mv2.jpeg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_be3ce74f42954a3a9c453bd79b14b212~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_be3ce74f42954a3a9c453bd79b14b212~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_de4d0e8880344d10850a7c8f6d7fabfb~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_de4d0e8880344d10850a7c8f6d7fabfb~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_2ccc3dcbdd27428482b30b5b789073a0~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_2ccc3dcbdd27428482b30b5b789073a0~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/2ae785_a35819cfa2c34fb9a94e66156f91ba12~mv2.jpg/v1/fill/w_980,h_655,q_68/2ae785_a35819cfa2c34fb9a94e66156f91ba12~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_b40bff87867c42d2a1e9f349cd6378a5~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_b40bff87867c42d2a1e9f349cd6378a5~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_105e2aeda0754e6ca78ba187f807384a~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_105e2aeda0754e6ca78ba187f807384a~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/f2bc97_9827ccb1e1894eab9d9dd46e530a3841~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_9827ccb1e1894eab9d9dd46e530a3841~mv2.jpg', alt: 'Gallery 2022' },
      { src: 'https://static.wixstatic.com/media/2ae785_49f8fd855f6e407abccf6ed27969cad8~mv2.jpg/v1/fill/w_980,h_655,q_68/2ae785_49f8fd855f6e407abccf6ed27969cad8~mv2.jpg', alt: 'Gallery 2022' },
    ],
  },
  {
    year: 2023,
    label: 'XII Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/f2bc97_91732f54b219407380e7fcb6b325c79f~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_91732f54b219407380e7fcb6b325c79f~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_54c4f3b653f044958f692fa242ff5339~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_54c4f3b653f044958f692fa242ff5339~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_d7d5dafa9c5444ceb464d1c93b3593eb~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_d7d5dafa9c5444ceb464d1c93b3593eb~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_daf905cab5c54a69977c1beb560fba40~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_daf905cab5c54a69977c1beb560fba40~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_5c13fa050e614021b5658246a57c4d15~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_5c13fa050e614021b5658246a57c4d15~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_0699da244ab748c89603bbea60ec59f2~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_0699da244ab748c89603bbea60ec59f2~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_f3953a106cb342318d08636613860279~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_f3953a106cb342318d08636613860279~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_e3e8940df7794152a2a5c7eb3be2f16d~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_e3e8940df7794152a2a5c7eb3be2f16d~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_f372e77ac065491caa3e9e79560144e8~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_f372e77ac065491caa3e9e79560144e8~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_bbbae41b123c47c59f32f4a9aaffd4ee~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_bbbae41b123c47c59f32f4a9aaffd4ee~mv2.jpg', alt: 'Gallery 2023' },
      { src: 'https://static.wixstatic.com/media/f2bc97_c29c0d0ddb4744e8af241e7a2d3943a3~mv2.jpg/v1/fill/w_980,h_655,q_68/f2bc97_c29c0d0ddb4744e8af241e7a2d3943a3~mv2.jpg', alt: 'Gallery 2023' },
    ],
  },
  {
    year: 2024,
    label: 'XIII Edition',
    images: [
      { src: 'https://static.wixstatic.com/media/612c5c_6dea151d3f8e446b92e43b35d0ec8160~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_6dea151d3f8e446b92e43b35d0ec8160~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_b87dccf9cfa643f5aab5da6a60bc739c~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_b87dccf9cfa643f5aab5da6a60bc739c~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_a674804d6efe45fcacd8ab5b86bb009e~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_a674804d6efe45fcacd8ab5b86bb009e~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_1950464ce4604c1aa3a16fa6a7c43704~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_1950464ce4604c1aa3a16fa6a7c43704~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_a78fdff86368418baf6f1e18b1ddee89~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_a78fdff86368418baf6f1e18b1ddee89~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_33cdfd0df5a948e383c6cc0d252e6f87~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_33cdfd0df5a948e383c6cc0d252e6f87~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_13e6216b24a147f28e4a85d35120d3fc~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_13e6216b24a147f28e4a85d35120d3fc~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_62c0828dfbe241049164acbddd493680~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_62c0828dfbe241049164acbddd493680~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_81c0557e5a024850b3b234ddecd3b3c1~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_81c0557e5a024850b3b234ddecd3b3c1~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_d64d827b331d484599d35e31adec3d40~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_d64d827b331d484599d35e31adec3d40~mv2.jpg', alt: 'Gallery 2024' },
      { src: 'https://static.wixstatic.com/media/612c5c_1d29f1a7a85042b3acbf7d3d2b2b7a4e~mv2.jpg/v1/fill/w_980,h_655,q_68/612c5c_1d29f1a7a85042b3acbf7d3d2b2b7a4e~mv2.jpg', alt: 'Gallery 2024' },
    ],
  },
  {
    year: 2025,
    label: 'XII Edition',
    images: [
      { src: '/images/gallery-25/1J2A0141.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/1J2A0713.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/1J2A8412.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_7752.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_7868.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_7898.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8010.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8047.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8053.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8086.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8107.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8141.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8204.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8224.JPG', alt: 'LCF 2025' },
      { src: '/images/gallery-25/IMG_8307.JPG', alt: 'LCF 2025' },
    ],
  },
];

// Flat list for backward compatibility
export const GALLERY_IMAGES = GALLERY_YEARS.flatMap((year) =>
  year.images.map((img) => ({
    src: img.src,
    alt: `${img.alt} ${year.year}`,
    category: 'events',
    span: 'normal' as const,
  }))
);
