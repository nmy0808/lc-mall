<script>
export default {
  name: 'c-box',
  props: {
    width: {
      type: [String, Number],
      default: 'auto',
    },
    height: {
      type: [String, Number],
      default: 'auto',
    },
    tag: {
      type: String,
      default: 'div',
    },
    center: {
      type: Boolean,
      default: null,
    },
    vertical: {
      type: String,
      default: 'top',
    },
    horizontal: {
      type: String,
      default: 'left',
    },
    border: {
      type: String,
      default: null,
    },
    wrap: {
      type: String,
      default: 'no-wrap',
    },
  },
  computed: {
    calcStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
      };
    },
    calcClass() {
      let vertical, horizontal, border, wrap;
      switch (this.border) {
        case 'top':
          border = 'c-box--border-top';
          break;
        case 'bottom':
          border = 'c-box--border-bottom';
          break;
        case 'left':
          border = 'c-box--border-left';
          break;
        case 'right':
          border = 'c-box--border-right';
          break;
        case 'all':
          border = 'c-box--border-all';
          break;
      }
      switch (this.wrap) {
        case 'no-wrap':
          wrap = 'c-box--no-wrap';
          break;
        case 'wrap':
          wrap = 'c-box--wrap';
          break;
      }
      if (!this.center) {
        switch (this.vertical) {
          case 'top':
            vertical = 'c-box--top';
            break;
          case 'center':
            vertical = 'c-box--vertical-center';
            break;
          case 'bottom':
            vertical = 'c-box--bottom';
            break;
        }
        switch (this.horizontal) {
          case 'left':
            horizontal = 'c-box--left';
            break;
          case 'center':
            horizontal = 'c-box--horizontal-center';
            break;
          case 'right':
            horizontal = 'c-box--right';
            break;
          case 'between':
            horizontal = 'c-box--between';
            break;
          case 'around':
            horizontal = 'c-box--around';
            break;
        }
        console.log(border);
        return [vertical, horizontal, border, wrap];
      }
      return ['c-box--center', border, wrap];
    },
  },
  render(h) {
    return h(
      this.tag,
      { class: ['c-box', ...this.calcClass], style: this.calcStyle },
      this.$slots.default,
    );
  },
};
</script>

<style lang="scss" scoped>
@include b(c-box) {
  display: flex;
  /*换行*/
  @include m(no-wrap) {
    flex-wrap: nowrap;
  }
  @include m(wrap) {
    flex-wrap: wrap;
  }
  /*边框*/
  @include m(border-top) {
    border-top: $border-base;
  }
  @include m(border-bottom) {
    border-bottom: $border-base;
  }
  @include m(border-left) {
    border-left: $border-base;
  }
  @include m(border-right) {
    border-right: $border-base;
  }
  @include m(border-all) {
    border: $border-base;
  }
  /*垂直*/
  @include m(top) {
    align-items: flex-start;
  }
  @include m(vertical-center) {
    align-items: center;
  }
  @include m(bottom) {
    align-items: flex-end;
  }
  /*水平*/
  @include m(left) {
    justify-content: flex-start;
  }
  @include m(horizontal-center) {
    justify-content: center;
  }
  @include m(right) {
    justify-content: flex-end;
    justify-content: space-between;
  }
  @include m(between) {
    justify-content: space-between;
  }
  @include m(around) {
    justify-content: space-around;
  }
  /*全部居中*/
  @include m(center) {
    align-items: center;
    justify-content: center;
  }
}
</style>