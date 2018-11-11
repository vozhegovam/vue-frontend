<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item :disabled="false" :href="'/templates'">
        Проверочные листы
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-if="listTemplateById !== null"
                          :disabled="true">
        № {{listTemplateById.name}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Имя"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea auto-grow v-model="editedItem.description" label="Описание"></v-textarea>
                </v-flex>
                <v-flex v-if="editedItem.act !== null" xs12>
                  <v-textarea auto-grow v-model="editedItem.act" label="Закон"></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fine" label="Штраф"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="createUpdatePointTemplate(editedItem)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card>
        <div v-if="listTemplateById !== null" center>
          <v-flex xs12>
            <v-textarea
              box
              auto-grow
              readonly
              label="Проверочный лист"
              v-model="listTemplateById.description"
            ></v-textarea>
          </v-flex>
        </div>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            v-for="item in pointTemplatesByParentId"
            :key="item.id">
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  <v-flex xs10>
                    <b>№ {{item.name}}</b>
                  </v-flex>
                  <v-flex xs2>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mx-0" @click="editItem(item)">
                      <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12>
                    <b>Описание:</b> {{item.description}}
                  </v-flex>

                  <v-layout
                    v-for="child in item.childrenPoints"
                    :key="child.id">
                    <v-flex xs12>
                      <v-card no wrap>
                        <v-card-title xs12>
                          <v-flex xs10>
                            <b>{{child.name}})</b> {{child.description}}
                          </v-flex>
                          <v-flex xs2>
                            <v-btn icon class="mx-0" @click="editItem(child)">
                              <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteItem(child)">
                              <v-icon color="pink">delete</v-icon>
                            </v-btn>
                          </v-flex>
                          <v-flex v-if="child.act !== ''" xs12>
                            <b>Правовой акт:</b> {{child.act}}
                          </v-flex>
                          <v-flex xs12>
                            <b>Штраф:</b> {{child.fine}}
                          </v-flex>
                        </v-card-title>
                      </v-card>
                    </v-flex>
                  </v-layout>

                  <v-flex xs12>
                    <b>Правовой акт:</b> {{item.act}}
                  </v-flex>
                  <v-flex v-if="item.childrenPoints.length === 0" xs12>
                    <b>Штраф:</b> {{item.fine}}
                  </v-flex>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['id'],
    data: () => ({
      list: '',
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        parentPoint: '',
        childrenPoints: [],
        listTemplate: this.id,
        name: '',
        description: '',
        fine: 0,
        act: '',
        orderNumber: ''
      },
      defaultItem: {
        id: null,
        parentPoint: '',
        childrenPoints: [],
        listTemplate: this.id,
        name: '',
        description: '',
        fine: 0,
        act: '',
        orderNumber: ''
      }
    }),
    computed: {
      pointTemplatesByParentId () {
        return this.$store.getters.getPointsByParent
      },
      listTemplateById () {
        return this.$store.getters.getListTemplateById
      }
    },
    methods: {
      createUpdatePointTemplate (pointTemplate) {
        if (pointTemplate.id !== null) {
          this.$store.dispatch('UPDATE_POINT', { pointTemplate: pointTemplate })
        }
        this.close()
      },

      editItem (pointTemplate) {
        this.editedItem = Object.assign({}, pointTemplate)
        this.dialog = true
      },

      deleteItem (pointTemplate) {
        confirm('Уверены что хотите удалить этот пункт?') && this.$store.dispatch('REMOVE_POINT', { pointTemplate })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    },
    created () {
      this.$store.dispatch('LOAD_LIST_TEMPLATE', { listId: this.id })
      this.$store.dispatch('LOAD_POINT_TEMPLATES', { listId: this.id })
    }
  }
</script>
