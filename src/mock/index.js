/**
 * mock data
 */

export const APP_ID = 'wx59a508fe793bbb3d'
export const SERVER = 'http://127.0.0.1:3000'

const banners = [
  {
    "image_name": "image007.jpg",
    "describe_msg": null,
    "image_url": "/static/image/ec2c6648-f921-488f-97b1-4f785f8bf84c.jpg",
    "image_id": 134
  },
  {
    "image_name": "04.jpg",
    "describe_msg": null,
    "image_url": "/static/image/2ed04120-3856-46e8-9969-54f7de6d07fc.jpg",
    "image_id": 138
  },
  {
    "image_name": "10.jpg",
    "describe_msg": null,
    "image_url": "/static/image/eb7ab360-8483-41ef-92a3-27fcb7ce9c73.jpg",
    "image_id": 143
  }
]

const new_product = [
  {
    "image_name": "11.jpg",
    "describe_msg": null,
    "image_url": "/static/image/8eca032a-eb5a-42ec-b09a-39cc3e8f3f7b.jpg",
    "image_id": 117
  },
  {
    "image_name": "01.jpg",
    "describe_msg": "",
    "image_url": "/static/image/098a7aff-3b3b-47f5-b5d1-a4d54c359f2a.jpg",
    "image_id": 118
  },
  {
    "image_name": "04.jpg",
    "describe_msg": null,
    "image_url": "/static/image/5f526272-026c-486a-88d6-23fd99be15e9.jpg",
    "image_id": 119
  }
]

const products = [{ type: 'new', title: '新品', imageList: new_product }]

const menu = [
  {
    "menu_name": "粉末涂料",
    "menu_id": "2",
    "child": [
      {
        "menu_name": "应用领域",
        "menu_id": "3",
        "child": [
          {
            "menu_name": "建筑领域",
            "menu_url": "/static/image/dce4bef7-cd46-43d5-987f-0208b2d51d51.jpg",
            "menu_id": "4"
          },
          {
            "menu_name": "家电领域",
            "menu_url": "/static/image/dce4bef7-cd46-43d5-987f-0208b2d51d51.jpg",
            "menu_id": "5"
          },
          {
            "menu_name": "一般工业",
            "menu_url": "/static/image/dce4bef7-cd46-43d5-987f-0208b2d51d51.jpg",
            "menu_id": "6"
          }
        ]
      },
      {
        "menu_name": "产品系列",
        "menu_id": "7",
        "child": [
          {
            "menu_name": "通用产品",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "8"
          },
          {
            "menu_name": "质保耐候",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "9"
          },
          {
            "menu_name": "闪光金属",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "10"
          },
          {
            "menu_name": "转印木纹",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "11"
          },
          {
            "menu_name": "健康系列",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "12"
          },
          {
            "menu_name": "创新功能",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "13"
          }
        ]
      }
    ]
  },
  {
    "menu_name": "水性涂料",
    "menu_id": "14",
    "child": [
      {
        "menu_name": "应用领域",
        "menu_id": "15",
        "child": [
          {
            "menu_name": "轨道交通",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "16"
          },
          {
            "menu_name": "商用车",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "17"
          },
          {
            "menu_name": "工业涂料",
            "menu_url": "/static/image/02d288ba-a638-4c33-b6ed-708f1f6508a0.jpg",
            "menu_id": "18"
          }
        ]
      }
    ]
  }
]

const product_type = [
  {
    "image_name": "58b43c99e8d88-1 拷贝.jpg",
    "describe_msg": "",
    "image_url": "/static/image/dce4bef7-cd46-43d5-987f-0208b2d51d51.jpg",
    "parent_id": 3,
    "image_id": 91,
    "product_name": "房地产",
    "menu_id": 4,
    "image_type": 1
  },
  {
    "image_name": "58b43c99e8d88-2 拷贝.jpg",
    "describe_msg": null,
    "image_url": "/static/image/7fdbecd8-6846-4cab-9e0b-b14411fa22ee.jpg",
    "parent_id": 3,
    "image_id": 92,
    "product_name": "房地产",
    "menu_id": 4,
    "image_type": 2
  },
  {
    "image_name": "58b43c99e8d88-3 拷贝.jpg",
    "describe_msg": null,
    "image_url": "/static/image/cc7fa2a0-0d77-4959-ae51-4055528b29ca.jpg",
    "parent_id": 3,
    "image_id": 93,
    "product_name": "房地产",
    "menu_id": 4,
    "image_type": 2
  },
  {
    "image_name": "58b43c99e8d88-4 拷贝.jpg",
    "describe_msg": null,
    "image_url": "/static/image/8afafd82-4be3-4057-b38a-cc9522ea4734.jpg",
    "parent_id": 3,
    "image_id": 94,
    "product_name": "房地产",
    "menu_id": 4,
    "image_type": 2
  }
]

export default {
  banners,
  products,
  menu,
  product_type
}
