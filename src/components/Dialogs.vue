<script setup>
const dialogs = ref(null)
const state = useSessionStorage('luckytime', { showDialog: false })

const openDialog = () => {
  dialogs.value.showModal()
  state.value.showDialog = true
}

onMounted(() => {
  if (!state.value.showDialog)
    openDialog()
})
</script>

<template>
  <!-- Rounded dialog -->
  <section>
    <dialog ref="dialogs" class="nes-dialog is-rounded max-w-180">
      <form method="dialog">
        <p class="title">
          Introdution
        </p>
        <p>This is a program that simulates the purchase of a lottery ticket to win the first prize. According to the rules related to the Chinese lottery's Double Lottery, the lottery is drawn twice a week, and assuming you participate in the purchase each time the lottery is drawn, the web page will show you how many years it will take until you win. Test your luck!</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary">
            Confirm
          </button>
        </menu>
      </form>
    </dialog>
  </section>
</template>
