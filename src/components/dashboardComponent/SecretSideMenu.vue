<template>
  
    <v-list dense nav>
    <v-list-item
      v-for="(item, index) in items"
      :key="item.title"
      :active-class="`success white--text`"
      link
    >
      <v-list-item-content @click="toggleSubitems(index)">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-icon @click="toggleSubitems(index)">
          {{ isOpen(index) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-list-item-action>
      
      <v-list v-if="isOpen(index)" dense nav>
        <v-list-item
          v-for="subitem in item.subitems"
          :key="subitem.title"
          :to="subitem.to"
          :active-class="`success white--text`"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ subitem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list-item>
  </v-list>

</template>

<script>

export default {
  data() {
    return {
      openIndexes: [], // Store indexes of open subitem groups
      items: [
        {
          title: 'Item 1',
          subitems: [
            { title: 'Subitem 1' },
            { title: 'Subitem 2' }
          ]
        },
        {
          title: 'Item 2',
          subitems: [
            { title: 'Subitem 3' },
            { title: 'Subitem 4' }
          ]
        },
        // Add more items here...
      ]
    };
  },
  
  methods: {
    isOpen(index) {
      return this.openIndexes.includes(index);
    },
    toggleSubitems(index) {
      if (this.openIndexes.includes(index)) {
        // Close the subitem group
        this.openIndexes = this.openIndexes.filter(i => i !== index);
      } else {
        // Open the subitem group
        this.openIndexes.push(index);
      }
    }
  }
};
</script>
