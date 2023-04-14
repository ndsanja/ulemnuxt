<script setup lang="ts">

interface Props {
  dataItemProps: any
}

const props = defineProps<Props>()

enum Element {
  Div = "div",
  Sectiion = "section",
  Span = "span",
  Header = "header",
  Footer = "footer",
  Main = "main",
  Nav = "nav",
  Li = "li",
  Ul = "ul",
  Ol = "ol",
  Img = "img",
  P = "p",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Button = "button",
  A = "a",
}

</script>
<template>
  <ElementDiv v-if="props.dataItemProps.elKind == Element.Div">
    <slot />
  </ElementDiv>
  <ElementSection v-else-if="props.dataItemProps.elKind == Element.Sectiion">
    <slot />
  </ElementSection>
  <ElementSpan v-else-if="props.dataItemProps.elKind == Element.Span">
    <slot />
  </ElementSpan>
  <ElementHeader v-else-if="props.dataItemProps.elKind == Element.Header">
    <slot />
  </ElementHeader>
  <ElementFooter v-else-if="props.dataItemProps.elKind == Element.Footer">
    <slot />
  </ElementFooter>
  <ElementMain v-else-if="props.dataItemProps.elKind == Element.Main">
    <slot />
  </ElementMain>
  <ElementNav v-else-if="props.dataItemProps.elKind == Element.Nav">
    <slot />
  </ElementNav>
  <ElementLi v-else-if="props.dataItemProps.elKind == Element.Li">
    <slot />
  </ElementLi>
  <ElementUl v-else-if="props.dataItemProps.elKind == Element.Ul">
    <slot />
  </ElementUl>
  <ElementOl v-else-if="props.dataItemProps.elKind == Element.Ol">
    <slot />
  </ElementOl>
  <ElementImg v-else-if="props.dataItemProps.elKind == Element.Img">
    <slot />
  </ElementImg>
  <ElementDiv v-else>
    <slot />
  </ElementDiv>
</template>